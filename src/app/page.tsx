// "use client"
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
// import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
// import Testimonials from "@/partials/Testimonials";
import { Button, Feature } from "@/types";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";

import RandomImage from "@/lib/utils/randomImage";
const Home = () => {
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
  importAll(require.context('../../public/astronaut-of-the-day/images', false, /\.(png|jpe?g|svg)$/));
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
                  <RandomImage imageList={images} width={600} height={600} priority={"True"} data-superjson/>
                </div>
                <div className="col">
                  <RandomImage imageList={images} width={600} height={600} priority={"True"} data-superjson/>
                </div>
                <div className="col hidden md:block">
                  <RandomImage imageList={images} width={600} height={600} priority={"True"} data-superjson/>
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
                <RandomImage imageList={images} width={600} height={600} priority={"False"} data-superjson/>
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
