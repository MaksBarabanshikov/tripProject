import instance from "@/app/api/instance";

export const AdminService = {
    createTour: async function(tour: any) {
        return await instance.post('tours/', tour);
    },
    getTours: async function() {
        return await instance.get('tours/')
    },
    getTourById: async function(id: string) {
        return await instance.get(`tours/find/${id}`)
    },
    deleteTour: async function(id: string) {
        return await instance.delete(`tours/${id}`)
    },
    putTour: async function(data: any) {
        return await instance.put(`tours/${data.id}`, data.tour)
    },
    getUsers: async function() {
        return await instance.get('users/')
    }
}