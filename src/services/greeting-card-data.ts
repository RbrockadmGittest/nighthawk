import http from "../http-common";

class GreetingCardData {

    create(data: any) {
        return http.post("/greeting-card", data);
    }

    update(id: string, data: any) {
        return http.put(`/greeting-card/${id}`, data);
    }

    get(id: string) {
        return http.get(`/greeting-card/${id}`);
    }
}

export default new GreetingCardData();