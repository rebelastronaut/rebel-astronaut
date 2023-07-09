import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import RandomImage from "@/lib/utils/randomImage";

const About = () => {
  const data: RegularPage = getListPage("pages/about.md");
  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;
  const imageList = {
    default: "string"
  };
  const cache = {}

  function importAll(r) {
      r.keys().forEach((key) => (cache[key] = r(key)));
  }
  importAll(require.context('../../../public/astronaut-of-the-day/images', false, /\.(png|jpe?g|svg)$/));
// @ts-ignore: Unreachable code error
  const images = Object.entries(cache).map(imageList => imageList[1].default); 

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
          <div className="col"/>
            <div className="col hidden sm:block">
              <RandomImage imageList={images} width={300} height={300} data-superjson/>
            </div>
            <div className="col">
              <RandomImage imageList={images} width={300} height={300} data-superjson/>
            </div>
            <div className="col hidden md:block">
              <RandomImage imageList={images} width={300} height={300} data-superjson/>
            </div>
            <div className="col"/>
          </div>
          <div className="row justify-center">
          <div className="text-center md:col-10 lg:col-7">
              <h2
                dangerouslySetInnerHTML={markdownify(title)}
                className="h3 mb-6"
              />
              <div className="content">
                <MDXContent content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
