"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShare,
  faEdit,
  faHome,
  faEye,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useGeneratedContext } from "@/app/context/generated-context";

export default function ContentPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { displayedContent, setDisplayedContent } = useGeneratedContext();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handlePreview = () => {
    // Implement preview functionality
    alert("Preview functionality to be implemented");
  };

  return (
    <div className="container content-page">
      <div className="content-container">
        <div className="content-header">
          <h2 className="content-title">Content for Platform</h2>
          <div className="action-icons">
            <FontAwesomeIcon
              icon={faShare}
              className="action-icon"
              title="Share"
            />
            <FontAwesomeIcon
              icon={faEdit}
              className="action-icon"
              onClick={handleEdit}
              title="Edit"
            />
            <Link href="/">
              <FontAwesomeIcon
                icon={faHome}
                className="action-icon"
                title="Back to Home"
              />
            </Link>
          </div>
        </div>
        {isEditing ? (
          <div className="editor-container">
            <textarea
              className="editor"
              value={displayedContent.content}
              onChange={(e) =>
                setDisplayedContent({
                  ...displayedContent,
                  content: e.target.value,
                })
              }
            ></textarea>
            <div className="editor-actions">
              <button className="editor-button" onClick={handlePreview}>
                <FontAwesomeIcon icon={faEye} className="button-icon" /> Preview
              </button>
              <button className="editor-button" onClick={handleSave}>
                <FontAwesomeIcon icon={faSave} className="button-icon" /> Save
              </button>
            </div>
          </div>
        ) : (
          <div className="content-body">
            {displayedContent.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
