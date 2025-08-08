import React, { useState, useEffect, useRef } from "react";
import { Loader, FormField, Card } from "../components";
import { download } from "../assets";
import { downloadImage } from "../utils";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allposts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState("");

  //call to get all the posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          headers: { "Content-Type": "application/json" },
        });

        // console.log("Fetch status:", response.status, response.ok);

        // parse exactly once
        const payload = await response.json();
        // console.log("Fetch JSON:", payload);

        // console.log('Raw payload' , JSON.stringify(payload,null,2));

        if (!response.ok) {
          // if your API returns an error message inside payload, you can read it here
          throw new Error(payload.message || `HTTP ${response.status}`);
        }

        // adapt to the shape you saw in the console
        const arr = payload.data ?? payload;
        setAllPosts(Array.isArray(arr) ? arr.reverse() : []);
      } catch (err) {
        console.error(err);
        alert(`Failed to load posts: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The community showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Browse through a collection of generated images By AI
        </p>
      </div>

      <div className="mt-16 ">
        <FormField />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            {/* for all type of devices  */}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={[]} title="No search results found" />
              ) : (
                <RenderCards data={allposts} title="No posts found" />
              )}
              {/* logic for searched or to see all the posts. */}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
