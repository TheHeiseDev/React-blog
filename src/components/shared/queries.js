import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { POSTS_URL } from "./constants";
import axios from "axios";

export const useGetPosts = () => {
  return useQuery("posts", () => {
    return axios
      .get(POSTS_URL)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};

// Метод получения одного поста по id
export const useGetOnePosts = (postId) => {
  return useQuery(["post", postId], () => {
    return axios
      .get(POSTS_URL + postId)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};

// Метод с помощью которого лайкаем посты
export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedPost) => {
      return axios
        .put(`${POSTS_URL}/${updatedPost.id}`, updatedPost)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      // onMutate: () => {
      //   console.log("mutate");
      // },
      onSuccess: (updatedPost) => {
        queryClient.invalidateQueries("posts");

        // ! Этот метод отправляет новый GET запрос на получения измененного объекта, что не очень оптимально

        // queryClient.invalidateQueries(["post", updatedPost.id]);

        // TOD Этот метод более оптимальный, при изменении объекта он не отправляет снова GET запрос чтоб получить обновленный объект.
        // При изменении объекта отправляется PUT запрос, и сервер нам возвращает изменненный объект
        // и мы уже этот изменный объект и принимает как новое значение без доп  GET  запроса.
        // Ссылка на документацию: https://reactdev.ru/libs/react-query/#_45

        queryClient.setQueryData(["post", updatedPost.id], updatedPost);
      },
      onError: (error) => {
        console.log("error", error);
      },
      // onSettled: () => {
      //   console.log("onSettled"); //Финальный метод, похож на .finally как в acync/await - выполняется в любом случае
      // },
    }
  );
};

export const useDeletePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    (blogPost) => {
      return axios
        .delete(`${POSTS_URL}/${blogPost.id}`)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      onSuccess: () => {
        //exact тут добавлен из-за того, что при удалении поста с его непосредственной карточки, после перехода на главную старницу (так как карточка была удалена)
        // мы получали ошибку в ввиде того, что на главной странице, происходил запрос постов и учитывался еще тот пост который мы удалили.
        queryClient.invalidateQueries("posts");

        if (location.pathname !== "/blog") {
          navigate("/blog", { replace: true });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};

export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedPost) => {
      return axios
        .put(`${POSTS_URL}/${updatedPost.id}`, updatedPost)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      onSuccess: (updatedPost) => {
        console.log("onSuccess", updatedPost);
        queryClient.invalidateQueries("posts");

        // Оптимальный способ получения измененного объекта из сервера
        queryClient.setQueryData(["post", updatedPost.id], updatedPost);
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );
};

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newBlogPost) => {
      return axios
        .post(POSTS_URL, newBlogPost)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        });
    },

    {
      onSuccess: (data) => {
        console.log("onSuccess", data); // data это ответ который возвращает сервер
        queryClient.invalidateQueries("posts");
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );
};
