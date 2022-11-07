import config from "../config.json";
import styled from "styled-components";
import {CSSReset} from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import {StyledTimeline} from "../src/components/Timeline";

function HomePage() {

    const estiloDaHomePage = { 
        //backgroundColor: "Red" 
    };

    //console.log(config.playlists)

    return (   
        <>
            <CSSReset />

            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu/>
                <Header/>
                <Timeline playlists = {config.playlists}></Timeline>
            
            </div>
        </>
    );
}
  
  export default HomePage

  /*function Menu() {
    return (
        <div>

            Menu

        </div>
    )
  }*/

  const StyledHeader = styled.div`

    .banner {
        margin-right: auto;
        width: 100%;
        min-height: 200px;
        object-fit: contain;
        margin-top: 50px;
        border-radius: 0 !important;
    }

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info{
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }

  `;

  function Header() {
    return (
        <StyledHeader>
            <section>
                <img src={config.banner} className="banner" />
            </section>

            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`}></img>
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>

        </StyledHeader>
    )
  }

  function Timeline(props) {
    const playlistsNames = Object.keys(props.playlists)
    //console.log(props.playlists)

    //Statement
    //Retorno por expressão (correto)
    return (
        <StyledTimeline >

            {playlistsNames.map((playlistsNames) => {
                const videos = props.playlists[playlistsNames];
                //console.log(videos)
                //console.log(playlistsNames)
                return (
                    <section>
                        <h2>{playlistsNames}</h2>
                        <div>
                            {
                                videos.map((video)=>{
                                    return (
                                        <a href={video.url}>
                                            <img src={video.thumb}></img>
                                            <span>{video.title}</span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </section>
                )

            })}

        </StyledTimeline >
    )
  }