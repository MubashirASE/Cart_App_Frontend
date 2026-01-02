export const buildHierarchy = (cats, parentId = null, level = 0) => {
  return cats
    .filter((cat) => {
      const pid = cat.parent?._id || cat.parent || null;
      return pid === parentId;
    })
    .map((cat) => ({
      ...cat,
      level,
      children: buildHierarchy(cats, cat._id, level + 1),
    }));
};

export const flattenHierarchy = (hierarchy) => {
  const result = [];
  hierarchy.forEach((item) => {
    result.push(item);
    if (item.children && item.children.length > 0) {
      result.push(...flattenHierarchy(item.children));
    }
  });
  return result;
};

export const getAllChildCategoryIds = (categoryId, categories) => {
  const childIds = [];
  const findChildren = (id) => {
    const children = categories.filter((cat) => {
      const pid = cat.parent?._id || cat.parent || null;
      return pid === id;
    });
    children.forEach((child) => {
      childIds.push(child._id);
      findChildren(child._id);
    });
  };

  findChildren(categoryId);
  return childIds;
};
