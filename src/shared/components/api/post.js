// import axios from 'axios';
// // const URL = 'https://jsonplaceholder.typicode.com/posts';
// // const LIMIT = 10;
// const BASE_URL = `https://pixabay.com/api/`;
// const API_KEY = `29154782-64abcd202d8466e583ce5ca87`;

// const instance = axios.create({
//   BASE_URL,
//     API_KEY,
//     name: "name",
//   page: "page"
//   //   params: {
//   // _limit: LIMIT,
//   //   },
// });

//   .get(
//         `${BASE_URL}?q=${name}&${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//       )
// export const getPosts = async (_page = 1) => {
//   const { data } = await instance.get('/', {
//     params: {
//       _page,
//     },
//   });
//   return data;
// };

// export const searchPosts = async (q, _page = 1) => {
//   const { data } = await instance.get('/', {
//     params: {
//       _page,
//       q,
//     },
//   });
//   return data;
// };
