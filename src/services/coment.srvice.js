import httpService from "./http.service";

const comentEndPoint = "comments/";

const comentsService = {
  createComent: async (payload) => {
    const { data } = await httpService.put(
      comentEndPoint + payload._id,
      payload
    );
    return data;
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(comentEndPoint, {
      params: {
        orderBy: `"pageId"`,
        equalTo: `"${pageId}"`
      }
    });
    return data;
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(comentEndPoint + commentId);
    return data;
  }
};

export default comentsService;
