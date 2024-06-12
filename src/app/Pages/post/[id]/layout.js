import axios from 'axios';

export async function generateMetadata({ params }) {
  const id = params.id;

  // Fetch or calculate your dynamic metadata here
  let title = 'Default Title';
  let description = 'Default descripton';

  try {
    const response = await axios.get(`https://admin.desh365.top/api/post/${id}`);
    const postData = response.data.data;

    title = postData.title || title;
    description = postData.post_body || description;
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function DetailLayout({ children }) {
  return <>{children}</>;
}
