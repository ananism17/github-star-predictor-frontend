import { Form } from "react-bootstrap";

export default function RepoForm({ index, formData, onChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(index, name, value);
  };

  return (
    <div className="repo-form">
      <Form className="form-grid">
        <Form.Group controlId={`name-${index}`}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId={`forks-${index}`}>
          <Form.Label>Forks</Form.Label>
          <Form.Control
            type="number"
            name="forks"
            value={formData.forks}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId={`open_issues-${index}`}>
          <Form.Label>Open Issues</Form.Label>
          <Form.Control
            type="number"
            name="open_issues"
            value={formData.open_issues}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId={`size-${index}`}>
          <Form.Label>Size</Form.Label>
          <Form.Control
            type="number"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId={`created_at-${index}`}>
          <Form.Label>Created At</Form.Label>
          <Form.Control
            type="date"
            name="created_at"
            value={formData.created_at}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId={`updated_at-${index}`}>
          <Form.Label>Updated At</Form.Label>
          <Form.Control
            type="date"
            name="updated_at"
            value={formData.updated_at}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId={`description-${index}`} className="col-span-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId={`language-${index}`}>
          <Form.Label>Language</Form.Label>
          <Form.Control
            type="text"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
    </div>
  );
}
