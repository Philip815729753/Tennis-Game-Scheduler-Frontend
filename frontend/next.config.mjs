// // next.config.mjs
// import withAntdLess from 'next-plugin-antd-less';

// /** @type {import('next').NextConfig} */
// const nextConfig = withAntdLess({
//   output: 'export', // Keep this setting to support static export
//   modifyVars: { '@primary-color': '#3b4f84' }, // Optional: Customize antd theme
//   lessVarsFilePath: './styles/variables.less', // Optional: Global LESS variables file

//   webpack(config) {
//     return config;
//   },
// });

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
//   // assetPrefix: '', 
//   // basePath: "/nextjs-github-ACE",
//   images: {
//     unoptimized: true,  
//   },
// };

// export default nextConfig;


import { writeFileSync } from 'fs';
import { join } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  
};

export default nextConfig;

