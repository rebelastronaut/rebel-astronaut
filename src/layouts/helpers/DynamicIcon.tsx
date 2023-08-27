import { FC } from "react";
// import type { IconType } from "@react-icons/all-files;
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedin }  from "@react-icons/all-files/fa/FaLinkedin";
// import * as FaIcons from "@react-icons/all-files/fa";
// import * as FaIcons6 from "@react-icons/all-file/fa6";
// import * as FiIcons from "@react-icons/all-files/fi";
// import * as Io5Icons from "@react-icons/all-files/io5";
// import * as RiIcons from "@react-icons/all-files/ri";
// import * as TbIcons from "@react-icons/all-files/tb";
// import * as TfiIcons from "@react-icons/all-files/tfi";

// type IconMap = Record<string, IconType>;

interface IDynamicIcon {
  icon: string;
  className?: string;
}

// const iconLibraries: { [key: string]: IconMap } = {
//   ai: AiIcons,
//   bs: BsIcons,
//   fa: FaIcons,
//   fa6: FaIcons6,
//   fi: FiIcons,
//   io5: Io5Icons,
//   ri: RiIcons,
//   tb: TbIcons,
//   tfi: TfiIcons,
// };

const DynamicIcon: FC<IDynamicIcon> = ({ icon, ...props }) => {

  if  ( icon === "FaGithub") {
    return <FaGithub {...props} />;;
  }
  if  ( icon === "FaLinkedin") {
    return <FaLinkedin {...props} />;;
  }
};

// const getIconLibrary = (icon: string): IconMap | undefined => {
//   const libraryKey = [...icon].reduce((lib, letter, i) => {
//     if (letter === letter.toUpperCase() && lib === "" && i > 0) {
//       return icon.slice(0, i).toLowerCase();
//     }
//     return lib;
//   }, "");

//   return iconLibraries[libraryKey];
// };

export default DynamicIcon;
