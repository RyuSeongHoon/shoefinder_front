// import { Storage } from "aws-amplify";
// import { useCallback } from "react";
// import { v4 as uuidv4 } from "uuid";

// const useFileManager = ({ author }) => {
//   const onSubmitHandler = useCallback(async (file) => {
//     console.log("filename", file.name);
//     const fileName = file.name;

//     try {
//       await Storage.put(`${author.id || 0}/${uuidv4()}/${fileName}`, file, {
//         level: "public",
//         contentType: "video/4ds",
//       });
//     } catch (error) {
//       console.log("error contetn upload", error);
//     }
//   }, []);

//   return {
//     onSubmitHandler,
//   };
// };

// export default useFileManager;
