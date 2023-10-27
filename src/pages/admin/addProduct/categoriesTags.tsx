import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";

const TagsCategories = ({ setTags }: { setTags: any }) => {
  const handleChange = (tags: any) => {
    setTags({ tags });
  };

  return <TagsInput value={setTags} onChange={handleChange} />;
};

export default TagsCategories;
