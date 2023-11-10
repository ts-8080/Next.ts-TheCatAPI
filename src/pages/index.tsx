import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  // console.log(result[0]);
  return result[0];
};

const Home: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setIsLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1 className="text-4xl font-bold font-mono">猫画像アプリ</h1>
      {isLoading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <img src={catImageUrl} width={500} height={"auto"} />
      )}

      <button
        className="outline outline-offset-1 outline-blue-500 mt-2 bg-slate-200 rounded hover:cursor-pointer"
        onClick={handleClick}
      >
        Click
      </button>
    </div>
  );
};

// SSR
export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};

export default Home;
