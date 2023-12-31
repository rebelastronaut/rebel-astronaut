import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import PostSidebar from "@/partials/PostSidebar";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";

const { event_folder, pagination } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const allPost: Post[] = getSinglePage(event_folder);
  const allSlug: string[] = allPost.map((item) => item.slug!);
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths: { page: string }[] = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      page: (i + 1).toString(),
    });
  }

  return paths;
};

function spreadPages(num: number): number[] {
  let pages = [];

  for (let i = 2; i <= num; i++) {
    pages.push(i);
  }

  return pages;
}

// for all regular pages
const Posts = ({ params }: { params: { page: number } }) => {
  const postIndex: Post = getListPage(`${event_folder}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(event_folder);
  const allCategories = getAllTaxonomy(event_folder, "categories");
  const categories = getTaxonomy(event_folder, "categories");
  const tags = getTaxonomy(event_folder, "tags");
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPage =
    params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

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
                    <EventCard data={post} />
                  </div>
                ))}
              </div>
              <Pagination
                section={event_folder}
                currentPage={currentPage}
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
