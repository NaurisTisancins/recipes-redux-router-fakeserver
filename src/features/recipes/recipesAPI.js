export const API_ENDPOINT = "http://localhost:8000/recipes";

export async function getRecipes() {
   try {
      const response = await fetch(API_ENDPOINT, {
         method: 'GET',
         headers: {
            "content-type": "application/json"
         }
      });
      if (!response.ok) throw response;
      const data = await response.json();
      return data;
   } catch (err) {
      return Promise.reject(err.statusText || err.message);
   }
};

export async function addRecipe(values) {
   try {
      const response = await fetch(API_ENDPOINT, {
         method: 'POST',
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(values),
      });
      if (!response.ok) throw response;
      const data = await response.json();
      return data;
   } catch (err) {
      return Promise.reject(err.statusText || err.message);
   }
}

export async function getRecipe(id) {
   try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
         method: 'GET',
         headers: {
            "content-type": "application/json",
         }
      });
      if (!response.ok) throw response;
      const data = await response.json();
      return data;
   } catch (err) {
      return Promise.reject(err.statusText || err.message);
   }
}

export async function updateRecipe(id, values) {
   try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
         method: "PUT",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(values),
      })
      if (!response.ok) throw response;

      return [id, values];
   } catch (err) {
      return Promise.reject(err.statusText || err.message)
   }

}

export async function deleteRecipe(id) {
   try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
         method: "DELETE",
         headers: {
            "content-type": "Application/json",
         },
      });
      if (!response.ok) throw response;
      return id;
   } catch (err) {
      return Promise.recect(err.statusText || err.message);
   }
}