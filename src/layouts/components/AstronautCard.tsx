import config from "@/config/config.json";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, plainify, slugify } from "@/lib/utils/textConverter";
import { Post } from "@/types";
import Link from "next/link";
import { FaRegFolder } from "@react-icons/all-files/fa/FaRegFolder";
import { FaRegUserCircle } from "@react-icons/all-files/fa/FaRegUserCircle";
import ImageFallback from "../helpers/ImageFallback";

const AstronautCard = ({ data }: { data: Post }) => {
  const { summary_length, astronaut_folder } = config.settings;
  const { title, image, author, categories, date } = data.frontmatter;
  return (
    <div className="bg-body dark:bg-darkmode-body">

      {image && (
        <ImageFallback
          className="mb-6 w-full rounded"
          src={image}
          alt={title}
          width={445}
          height={230}
        />
      )}
      <h4 className="mb-3">
        <Link href={`/${astronaut_folder}/${data.slug}`}>{title}</Link>
      </h4>
      <ul className="mb-4">
        <li className="mr-4 inline-block">
          <a href={`/authors/${slugify(author)}`}>
            <FaRegUserCircle className={"-mt-1 mr-2 inline-block"} />
            {humanize(author)}
          </a>
        </li>
        <li className="mr-4 inline-block">
          <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
          {categories?.map((category: string, index: number) => (
            <Link key={index} href={`/categories/${slugify(category)}`}>
              {humanize(category)}
              {index !== categories.length - 1 && ", "}
            </Link>
          ))}
        </li>
        {date && <li className="inline-block">{dateFormat(date)}</li>}
      </ul>
      <p className="mb-6">
        {plainify(data.content!.slice(0, Number(summary_length)))}
      </p>
      <Link
        className="btn btn-outline-primary btn-sm"
        href={`/${astronaut_folder}/${data.slug}`}
      >
        read more
      </Link>
    </div>
  );
};

export default AstronautCard;
