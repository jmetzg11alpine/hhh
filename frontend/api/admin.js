export async function saveNewItem() {
  try {
    console.log('new item saved');
  } catch (error) {
    console.error('error fetching items: ', error);
  }
}
