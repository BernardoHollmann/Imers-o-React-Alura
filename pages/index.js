import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import {StyledTimeline} from "../src/components/Timeline";
import { createClient } from '@supabase/supabase-js';
//import { videoService } from "../src/services/videoServices";
import { videoService } from "../src/Services/videoServices";

const PROJECT_URL = 'https://dwhfukyeofftszqpbllo.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3aGZ1a3llb2ZmdHN6cXBibGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTc4NjMsImV4cCI6MTk4Mzc3Mzg2M30.fJCffD5EY0-1nuSye9m2PLtuP2AT2Yl17HO428vpwbU'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

supabase.from("video")
        .select("*")
        .then((dados)=>{
            //console.log(dados.data)
        })

function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDaFiltro] = React.useState("")
    const [playlists, setPlaylists] = React.useState({});     // config.playlists

    React.useEffect(() => {
       // console.log("useEffect");
        service
            .getAllVideos()
            .then((dados) => {
               // console.log(dados.data);
                // Forma imutavel
                const novasPlaylists = {};
                dados?.data?.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist] = [
                        video,
                        ...novasPlaylists[video.playlist],
                    ];
                });

                setPlaylists(novasPlaylists);
            });
    }, []);

    const estiloDaHomePage = { 
        //backgroundColor: "Red" 
    };

    //console.log(config.playlists)

    return (   
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                {/*Prop Drilling*/}
                <Menu valorDoFiltro={valorDoFiltro} setValorDaFiltro={setValorDaFiltro}/>
                <Header/>
                <Timeline searchValue = {valorDoFiltro} playlists = {config.playlists}></Timeline>
            
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
    background-color: ${({ theme }) => theme.backgroundLevel1};

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

  //Home
  //Menu
  //Search
  //Informação sempre desce

  function Timeline({searchValue, ...props}) {
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
                    <section key={playlistsNames}>
                        <h2>{playlistsNames}</h2>
                        <div>
                            {
                                videos.filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                }).map((video)=>{
                                    return (
                                        <a key={video.url} href={video.url}>
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