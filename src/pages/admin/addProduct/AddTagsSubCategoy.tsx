interface AddTagsSubCategoryProps {
  elements: string[] | undefined;
}

export const AddTagsSubCategory: React.FC<AddTagsSubCategoryProps> = ({
  elements,
}) => {
  return (
    <>
      {elements && elements.length > 0 ? (
        elements.map((element, index) => <span key={index}>{element}</span>)
      ) : (
        <span>Añadir Tags</span>
      )}
    </>
  );
};
