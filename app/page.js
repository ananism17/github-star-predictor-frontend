"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import CustomNavbar from "./components/Navbar";
import RepoForm from "./components/RepoForm";

// const API_URL = "http://130.238.27.123/predict";
const API_URL = "/api/proxy";


export default function Home() {
  const router = useRouter();
  const [formCount, setFormCount] = useState(1);
  const [formsData, setFormsData] = useState([
    {
      name: "",
      forks: "",
      open_issues: "",
      size: "",
      created_at: "",
      updated_at: "",
      description: "",
      language: "",
      stars: "0",
    },
  ]);

  const handleFormCountChange = (e) => {
    const count = parseInt(e.target.value);
    setFormCount(count);
    setFormsData(
      Array(count)
        .fill()
        .map(
          (_, i) =>
            formsData[i] || {
              name: "",
              forks: "",
              open_issues: "",
              size: "",
              created_at: "",
              updated_at: "",
              description: "",
              language: "",
              stars: "0",
            }
        )
    );
  };

  const handleFormChange = (index, field, value) => {
    const updatedForms = [...formsData];
    updatedForms[index][field] = value;
    setFormsData(updatedForms);
  };

  const calculateFeatures = (form) => {
    const features = {};

    if (form.name) features.name = form.name;
    if (form.forks) features.forks = parseInt(form.forks);
    if (form.open_issues) features.open_issues = parseInt(form.open_issues);
    if (form.size) features.size = parseInt(form.size);
    if (form.language) features.language = form.language;
    if (form.description) features.description = form.description;

    // Add engineered features if date fields are present
    if (form.created_at) {
      const now = new Date();
      const created = new Date(form.created_at);
      features.repo_age_days = Math.max(
        0,
        Math.floor((now - created) / (1000 * 60 * 60 * 24))
      );
    }

    if (form.updated_at && form.created_at) {
      const now = new Date();
      const updated = new Date(form.updated_at);
      const created = new Date(form.created_at);
      const repo_age_days = Math.max(
        0,
        Math.floor((now - created) / (1000 * 60 * 60 * 24))
      );
      const last_update_days = Math.max(
        0,
        Math.floor((now - updated) / (1000 * 60 * 60 * 24))
      );

      features.last_update_days = last_update_days;
      features.activity_ratio = last_update_days / (repo_age_days + 1);
    }

    // Optional: Derived metrics
    const forks = parseInt(form.forks) || 0;
    const stars = parseInt(form.stars) || 0;
    if (stars >= 0) features.fork_star_ratio = forks / (stars + 1);

    const open_issues = parseInt(form.open_issues) || 0;
    const size = parseInt(form.size) || 0;
    if (size >= 0) features.issues_per_size = open_issues / (size + 1);

    if (form.description) features.description_length = form.description.length;

    return features;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const results = [];

      for (const form of formsData) {
        const payload = calculateFeatures(form);
        // console.log("POST Payload: ", payload);

        const response = await axios.post(API_URL, payload, {
          headers: { "Content-Type": "application/json" },
        });

        // console.log("Response: ", response.data);

        results.push({
          name: form.name || "Unnamed Repo",
          stars: Math.round(response.data.predicted_stars || 0),
        });
      }

      // Query string for results page
      const params = new URLSearchParams();
      results.forEach((r, i) => {
        params.append(`repo${i}_name`, r.name);
        params.append(`repo${i}_stars`, r.stars);
      });

      router.push(`/results?${params.toString()}`);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Prediction failed. Check console for error.");
    }
  };

  return (
    <main className="main-background">
      <CustomNavbar />

      <Container className="text-white py-4 mt-4">
        <Form.Group className="repo-form mb-4">
          <Form.Label>Select number of Repositories:</Form.Label>
          <Form.Select
            value={formCount}
            onChange={handleFormCountChange}
            className="w-auto"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="form-container">
          {formsData.map((data, index) => (
            <RepoForm
              key={index}
              index={index}
              formData={data}
              onChange={handleFormChange}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="dark"
            className="mt-4 button-dark"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Container>
    </main>
  );
}
