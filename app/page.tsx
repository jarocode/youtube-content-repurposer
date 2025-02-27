"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faLinkedin,
  faTwitter,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { truncateText } from "./utils/helpers";

interface Content {
  id: string;
  platform: string;
  title: string;
  content: string;
}

type IconKey = "LinkedIn" | "X" | "Medium" | "Email";

const contentIcon = {
  LinkedIn: faLinkedin,
  X: faTwitter,
  Medium: faMedium,
  Email: faEnvelope,
};

export default function Home() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<Content[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/repurposing", {
      method: "POST",
      body: JSON.stringify({ youtube_url: youtubeLink }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response was successful
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // Extract the JSON data from the response
    const result = await res.json();
    const contentData = result.data;
    console.log("Data:", contentData);

    // // Simulating API call
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock generated content
    // const mockContent: Content[] = [
    //   {
    //     id: "1",
    //     platform: "LinkedIn",
    //     title: "LinkedIn Post",
    //     content:
    //       "A professional content of the YouTube content, tailored for your network...",
    //   },
    //   {
    //     id: "2",
    //     platform: "X",
    //     title: "X Thread",
    //     content:
    //       "A concise thread summarizing key points, perfect for engagement...",
    //   },
    //   {
    //     id: "3",
    //     platform: "Medium",
    //     title: "Medium Article",
    //     content:
    //       "An in-depth article exploring the topic, ready for publication...",
    //   },
    //   {
    //     id: "4",
    //     platform: "Email",
    //     title: "Newsletter",
    //     content:
    //       "An engaging email newsletter based on the video, designed to captivate your audience...",
    //   },
    // ];

    setGeneratedContent(contentData);
    setIsLoading(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo">ContentAI</div>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <h1>Transform Your YouTube Content</h1>
          <p>
            Instantly repurpose your YouTube videos into engaging content for
            LinkedIn, Twitter, Medium, and email newsletters.
          </p>
          <form onSubmit={handleSubmit} className="input-container">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faYoutube} className="input-icon" />
              <input
                type="text"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                placeholder="Paste your YouTube link here"
                className="input-field"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Generate Content
            </button>
          </form>
        </div>
      </header>

      <main className="container">
        {isLoading && <div className="loader"></div>}

        {generatedContent.length > 0 && (
          <div className="card-container">
            {generatedContent.map((content) => {
              return (
                <div key={content?.id} className="card">
                  <FontAwesomeIcon
                    icon={contentIcon[content?.platform as IconKey]}
                    className="card-icon"
                  />
                  <h3>{content?.platform}</h3>
                  <p>{truncateText(content?.content, 40)}</p>
                  <Link
                    href={`/content/${content?.id}?content=${encodeURIComponent(
                      content.content
                    )}`}
                    className="view-button"
                  >
                    View full content
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
