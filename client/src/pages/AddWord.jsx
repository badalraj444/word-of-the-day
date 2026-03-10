import { useState } from "react";
import { addWord } from "../lib/api";

const initialFormState = {
  word: "",
  meaning: "",
  example: "",
};

const AddWord = () => {
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await addWord(formState);

      if (response.status === 200) {
        alert("Word added successfully!");

        // reset form in ONE LINE
        setFormState(initialFormState);
      }else if (response.status === 409) {
        alert("Word already exists!");
        // reset form in ONE LINE
        setFormState(initialFormState);
      } else {
        alert("Failed to add word! Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error occurred!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-title">
        <h1>Add a New Word</h1>
      </div>
      <div className="form-container">
      <form onSubmit={handleSubmit} className="form">

        <label className="form-group">
          <span>Word</span>
          <input
            type="text"
            name="word"
            value={formState.word}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-group">
          <span>Meaning</span>
          <input
            type="text"
            name="meaning"
            value={formState.meaning}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-group">
          <span>Example</span>
          <input type="text"
            name="example"
            value={formState.example}
            onChange={handleChange}
            rows="3"
          />
        </label>

        <input
          type="submit"
          value={isSubmitting ? "Submitting..." : "Submit"}
          className="submit"
          disabled={isSubmitting}
        />

      </form>
    </div>
    </div>
  );
};

export default AddWord;
