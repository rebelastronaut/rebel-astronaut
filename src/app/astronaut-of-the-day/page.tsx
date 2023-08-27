// "use client"
import AstronautCard from "@/components/AstronautCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
// import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
// import PostSidebar from "@/partials/PostSidebar";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
const { astronaut_folder, pagination } = config.settings;

// for all regular pages
const Posts = () => {
  const postIndex: Post = getListPage(`${astronaut_folder}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(astronaut_folder);
  // const allCategories = getAllTaxonomy(astronaut_folder, "categories");
  // const categories = getTaxonomy(astronaut_folder, "categories");
  // const tags = getTaxonomy(astronaut_folder, "tags");
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = sortedPosts.slice(0, pagination);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={postIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="row gx-5">
            <div className="lg:col-15">
              <div className="row">
                {currentPosts.map((post: any, index: number) => (
                  <div key={index} className="mb-20 md:col-4">
                    <AstronautCard data={post} />
                  </div>
                ))}
              </div>
              <Pagination
                section={astronaut_folder}
                currentPage={1}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Posts;
