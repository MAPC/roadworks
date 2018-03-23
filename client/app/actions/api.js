export default {
  getNodes: (nodeIds) => {
    const asString = nodeIds.length
        ? nodeIds.slice(1).reduce((s, id) => s + `&id[]=${id}`, `id[]=${nodeIds[0]}`)
        : '';
    return fetch(`/api/node?${asString}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'same-origin',
      method: 'GET',
    });
  },
};
