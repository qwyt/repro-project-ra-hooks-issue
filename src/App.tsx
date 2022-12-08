// in src/admin/index.tsx
import {
    Admin,
    Resource,
    ListGuesser,
    Create,
    TextInput,
    SimpleForm,
    DateInput,
    required,
    SelectInput
} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import ReactDOM from "react-dom";
import {useWatch} from 'react-hook-form';

const countries = ['USA', 'UK', 'France'];
const cities = {
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    UK: ['London', 'Birmingham', 'Glasgow', 'Liverpool', 'Bristol'],
    France: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
};
const toChoices = (items: any) => items.map((item: any) => ({id: item, name: item}));


const CityInput = (props: any) => {
    const country = useWatch({name: 'country'});
    return (
        <SelectInput
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            choices={country ? toChoices(cities[country]) : []}
            {...props}
        />
    )
}

export const PostCreate = () => {

    return <Create>
        <SimpleForm>
            <CityInput/>
            <TextInput source="title" validate={[required()]} fullWidth/>
            <TextInput source="teaser" multiline={true} label="Short description"/>
            <DateInput label="Publication date" source="published_at" defaultValue={new Date()}/>
        </SimpleForm>
    </Create>
}
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="posts" list={ListGuesser} create={PostCreate}/>
        <Resource name="comments" list={ListGuesser}/>
    </Admin>
);

// export const App = () => (
//     <Admin dataProvider={jsonServerProvider('https://jsonplaceholder.typicode.com')}>
//         <Resource name="posts"/>
//         {/*// create={PostCreate}/>*/}
//     </Admin>
// );

function render() {
    ReactDOM.render(<App/>, document.body);
}

render();
// Add this to the end of the existing file
