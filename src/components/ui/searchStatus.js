const SearchStatus = (length) => {
  if (length < 5 && length > 1) {
    return `${length} человека тусанут с тобой сегодня`;
  } else if (length === 0) {
    return "Ни кто сегодня с тобой не тусанет";
  }
  return `${length} человек тусанет с тобой сегодня`;
};

export default SearchStatus;
