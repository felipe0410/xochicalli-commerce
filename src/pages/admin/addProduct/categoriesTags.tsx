// import React, { useState } from "react";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";

const TagsCategories = ({ setTags }: { setTags: any }) => {
  //const [tags, setTags] = useState({ tags: [] });
  const handleChange = (tags: any) => {
    setTags({ tags });
  };

  return <TagsInput value={setTags} onChange={handleChange} />;
};

export default TagsCategories;
