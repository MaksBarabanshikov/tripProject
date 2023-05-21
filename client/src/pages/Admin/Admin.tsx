import React from 'react';
import {MyInput} from "@/shared/ui/MyInput";

const Admin = () => {
    return (
        <div>
            <form>
                <MyInput
                    isRequired
                    label={'Название тура'}
                    isError={false}
                />
                <MyInput
                    isRequired
                    label={'Тип'}
                    isError={false}
                />
                <MyInput
                    isRequired
                    label={'Город'}
                    isError={false}
                />
            </form>
        </div>
    );
};

export default Admin;
