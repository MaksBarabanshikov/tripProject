import instance from "@/app/api/instance";

export const BookingService = {
    createBooking: async function(booking: any) {
        return await instance.post('bookings/', booking);
    },
    getBookings: async function() {
        return await instance.get('bookings/');
    },
    getBookingsByIdUser: async function() {
        return await instance.get('bookings/user');
    },
    putBooking: async function(data: any) {
        return await instance.put('bookings/', data);
    },
}