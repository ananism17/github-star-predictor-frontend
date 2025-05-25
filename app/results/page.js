"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import CustomNavbar from "../components/Navbar";
import { Container, Table, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract predictions from URL
  const results = [];
  for (let i = 0; i < 5; i++) {
    const name = searchParams.get(`repo${i}_name`);
    const stars = searchParams.get(`repo${i}_stars`);
    if (name && stars) {
      results.push({ name, stars: parseInt(stars) });
    }
  }

  // Sort results by stars in descending order
  results.sort((a, b) => b.stars - a.stars);

  return (
    <Container className="py-4 mt-4">
      <div className="mb-4">
        <Button
          variant="dark"
          className="button-dark"
          onClick={() => router.push("/")}
        >
          ← Return
        </Button>
      </div>

      <div className="repo-form mb-4">
        <h2 className="custom-header">Prediction Result</h2>
      </div>

      <div className="repo-form">
        <Table
          striped
          bordered
          hover
          variant="dark"
          responsive
          className="mb-0"
        >
          <thead>
            <tr>
              <th>Repository Name</th>
              <th>Predicted Stars</th>
            </tr>
          </thead>
          <tbody>
            {results.map((repo, idx) => (
              <tr key={idx}>
                <td>{repo.name}</td>
                <td>{repo.stars}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

function LoadingFallback() {
  return (
    <Container className="py-4 mt-4">
      <div className="repo-form">
        <h2 className="custom-header">Loading results...</h2>
      </div>
    </Container>
  );
}

export default function ResultsPage() {
  return (
    <main className="main-background">
      <CustomNavbar />
      <Suspense fallback={<LoadingFallback />}>
        <ResultsContent />
      </Suspense>
    </main>
  );
}
