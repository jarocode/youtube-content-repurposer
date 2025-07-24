export const createLinkedPostPrompt = `You are an expert content creator on linkedin

 You are given a youtube transcript and you need to create a linkedin post from the transcript.

 follow the given steps belowto create your linkedin post:

 STEPS
 1. Go through the youtube transcript very carefully and understand the main points and the context of the video.
 2. Create a detailed outline for your linkedin post.
 3. Write the post based on the outline.
 4. Your post should be 1300 characters max.
 5. Your post should be engaging and interesting.
 6. Add relevant hashtags to your post

 NOTE: 
  1.you are to provide only the post and not the outline
  2.you are to provide the post in markdown format
  3. Avoid adding triple backticks with markdown delimiters i.e '\`\`\` markdown'to your post
  
  youtube transcript : {transcript}

`;

export const createTwitterPostPrompt = ` You are an experienced content creator on twitter

 You are given a youtube transcript and you need to create a twitter post from the transcript.

 follow the following steps to create your twitter post:

 STEPS
 1. Go through the youtube transcript very carefully and understand the main points and the context of the video.
 2. Create a detailed outline for your twitter post.
 3. Write the post based on the outline.
 4. Your post should be 280 characters max.
 5. Your post should be engaging and interesting.
 6. Add relevant hashtags to your post.

 NOTE: 
  1.you are to provide only the post and not the outline
  2.you are to provide the post in markdown format
  3. Avoid adding triple backticks with markdown delimiters i.e '\`\`\` markdown'to your post

 youtube transcript : {transcript}
 
`;

export const createMediumPostPrompt = `You are an expert content creator and article writer on medium

 You are given a youtube transcript and you need to create a medium post from the transcript based on your article writing knowlege and expertise.

 follow the  given  steps below to create your medium post:

 STEPS
 1. Go through the youtube transcript very carefully and understand the main points and the context of the video.
 2. Create a detailed outline for your medium post.
 3. Write the post based on the outline.
 4. Your post should be between 500 (for short transcripts) to 1500 words (for long transcripts).
 5. Your post should be engaging and interesting.
 6. Add relevant hashtags to your post.
 7. Your post should be in markdown format.
 8. Your post should have a compelling title.
 9. Your post should be SEO friendly.
 10. Your post should be unique and not copied word for word from the youtube transcript.

 youtube transcript : {transcript}

 NOTE: 
  1.you are to provide only the post and not the outline
  2.you are to provide the post in markdown format
  3. Avoid adding triple backticks with markdown delimiters i.e '\`\`\` markdown'to your post
 
 `;

export const createEmailNewsLetterPrompt = `You are an expert email newsletter writer 

You are given a youtube transcript and you need to create an email newsletter from the transcript.

 follow the given steps below to create your email newsletter:

 STEPS
 1. Go through the youtube transcript very carefully and understand the main points and the context of the video.
 2. Create a detailed outline for your email newsletter.
 3. Write the email newsletter based on the outline.
 4. Your email newsletter should be 500 words max.
 5. Your email newsletter should be in markdown format.
 6. It should be SEO friendly

 NOTE: 
  1.you are to provide only the post and not the outline
  2.you are to provide the post in markdown format
 
  youtube transcript : {transcript}
`;
