// "use client"
import { markdownify } from "@/lib/utils/textConverter";
// import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
// import Testimonials from "@/partials/Testimonials";
import { Button, Feature } from "@/types";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import EventCard from "@/components/EventCard";
import config from "@/config/config.json";
import { Post } from "@/types";
import { sortByDate } from "@/lib/utils/sortFunctions";
import { getListPage, getSinglePage } from "@/lib/contentParser";

import RandomImage from "@/lib/utils/randomImage";



const Home = () => {
  const { event_folder, pagination } = config.settings;
  const postIndex: Post = getListPage(`${event_folder}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(event_folder);
  // const allCategories = getAllTaxonomy(astronaut_folder, "categories");
  // const categories = getTaxonomy(astronaut_folder, "categories");
  // const tags = getTaxonomy(astronaut_folder, "tags");
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / 1);
  const currentPosts = sortedPosts.slice(0, 1);
  const homepage = getListPage("_index.md");
  // const testimonial = getListPage("sections/testimonial.md");
  // const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button; randomImage?: RandomImage};
    features: Feature[];
  } = frontmatter;

  const cache = {}

  function importAll(r) {
      r.keys().forEach((key) => (cache[key] = r(key)));
  }
  importAll(require.context('../../public/astronaut-of-the-day/images', false, /\.(png|jpe?g|svg|webp)$/));
  // @ts-ignore: Unreachable code error
  const images = Object.entries(cache).map(cache => cache[1].default);
  


  return (
    <>
      <SeoMeta />
      <section className="section pt-14">
        <div className="container">
        <div className="row justify-center">
            <div className="mb-16 text-center lg:col-7">
              <h1
                className="mb-4"
                dangerouslySetInnerHTML={markdownify(banner.title)}
              />
              <p
                className="mb-8"
                dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
              />
              {banner.button!.enable && (
                <a className="btn btn-primary" href={banner.button!.link}>
                  {banner.button!.label}
                </a>
              )}
            </div>
            <div className="container">
              <div className="row items-center justify-between">                 
                <div className="col">
                  <RandomImage imageList={images} width={600} height={600} priority={"True"} alt={"Astronaut"} data-superjson/>
                </div>
                <div className="col">
                  <RandomImage imageList={images} width={600} height={600} priority={"True"} alt={"Astronaut"}  data-superjson/>
                </div>
                <div className="col hidden md:block">
                  <RandomImage imageList={images} width={600} height={600} priority={"True"} alt={"Astronaut"} data-superjson/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
              {/* {feature.event == true */}
                {currentPosts.map((post: any, index: number) => (
                    <EventCard key="1" data={post} />
                ))}
              {/* } */}
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck className={"absolute left-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button.enable && (
                  <a
                    className="btn btn-primary mt-5"
                    href={feature.button.link}
                  >
                    {feature.button.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* <Testimonials data={testimonial} />
      <CallToAction data={callToAction} /> */}
    </>
  );
};

export default Home;
