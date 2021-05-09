import spotify from '../../auth/Spotify';

const getCategoryData = async () => {
  try {
    const pageNo = Math.floor(Math.random() * 11);

    const data = await spotify.getCategories({
      limit: 20,
      country: 'IN',
      offset: pageNo,
    });

    const {categories} = data.body;

    return categories.items;
  } catch (err) {
    console.log(err);
  }
};

export {getCategoryData};
