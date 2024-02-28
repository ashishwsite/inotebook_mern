import Notes from './Notes';

export const Home = (props) => {

    return (
        <div> 
            <Notes data={props.setAlertmess}/>
        </div>
    )
}