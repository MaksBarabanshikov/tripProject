import instance from "@/app/api/instance";

export const AdminService = {
    createTour: async function(tour: any) {
        return await instance.post('tours/', tour);
    },
    getTours: async function() {
        return await instance.get('tours/')
    }
}