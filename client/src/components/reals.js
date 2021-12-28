/* eslint-disable no-unused-expressions */

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "./home.js";
import "./reals.css";
import hear from "./corazon.svg";
import perfil from "./perfil.jpg";
import burble from "./burble.svg";
import send from "./send.svg";
import puntos from "./puntos.svg";
import flechita from "./flecha.svg";
import hearfill from "./hear_fill.svg";
import hearfillG from "./hear_fillG.svg";
import perfil2 from "./perfil.svg";
import poster from "./negro.jpg";

import { gql, useQuery, useMutation } from "@apollo/client";

//recove host from enviroment
const host = process.env.REACT_APP_HOST;

const query = gql`
  query  GetReals($page:Int,$limit:Int) {
    GetReals(page:$page,limit:$limit) {
      src
      _id
      likes {
        idU
      }
      coments {
        ref
      }
    }
  }
`;



//make a hook that detect user is 100px to the end of the page with  intersetionObserver
const useIntersectionObserver = (root,callback,externalRef) => {
  const ref = useRef();
  useEffect(() => {
    const element =  externalRef ?   externalRef.current :   ref.current;

 

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    },{
      root,
      rootMargin: RealsTopixel(5) + 'px'
    });
    if (element) {
      observer.observe(element);
    }
    return () => {
      observer.disconnect();
    };
  }, [externalRef,ref]);
  return ref;
};


// const  graphqlQuery = async (query) => {

// return   await (await fetch("http://192.168.1.110:4000/graphql",{method:"POST",headers:{"Content-Type": "application/json"},body:JSON.stringify(query)})).json();

// }


const RealsTopixel = (amount) =>{

let screenHeight = window.innerHeight;
//heigth the margin is 90% of the screen
let margin = screenHeight * 0.9;



return amount * margin;


}

var obersevador = new IntersectionObserver(




  (entradas, _) => {
    entradas.forEach((en) => {
      if (en.isIntersecting) {
        en.target.currentTime = 0;
        en.target.play();
      } else {
        en.target.pause();
      }
    });
  },
  { threshold: 0.4 }
);

export const Reals = () => {
  // const [vi,setVi] = useState([]);
  const [ViewComents, Vactive] = useState(false);
  const [view, setView] = useState();



  useEffect(() => {}, []);

  const SwichtComents = (id) => {
    if (id) {
      setView(id);
    }

    if (ViewComents) {
      Vactive(false);
    } else {
      Vactive(true);
    }
  };


  const rootRef = useRef();
  return (
    <div>
      <div
         ref={rootRef}
        className={ViewComents === false ? "container" : "container preview"}
      >
        <Display handleC={SwichtComents}  rooRef={rootRef}/>
      </div>

      {ViewComents === false ? (
        <Navbar />
        
      ) : (
        <Comentarios _id={view} handleCommnets={SwichtComents} />
      )}

     
    </div>
  );
};

const Display = (props) => {
  const { loading, error, data  , fetchMore} = useQuery(query, {variables:{page:0,limit:10}});
const [page,setPage] = useState(0);


const externalRef = useRef();
const ref = useIntersectionObserver(props.rooRef.current,()=>  {setPage((page)=> page +1 )},loading ? null : externalRef);


useEffect(() => {

 
  if(data && page === 0){
    let numberOfvideo = data.GetReals.length;
    let pageOfvideo = Math.ceil(numberOfvideo/5);
    setPage(pageOfvideo);
    console.log('chache:',page)
  }

} ,[]);




useEffect(() => {
  console.log("fech:",page)
  if(page !== 0 ){
  fetchMore({variables:{page}})
  }
}, [page]);



  if (loading) {
    return (
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        {" "}
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          height: "90vh",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>hubo un error en el ingreso de datos</p>
      </div>
    );
  }

  return  <>
  {
  data.GetReals.map((vide) => (
    <Video
      ComentsCan={vide.coments}
      status={false}
      key={vide._id}
      src={`http://${host}:5000${vide.src}`}
      likes={vide.likes}
      id={vide._id}
      handleCommnets={props.handleC}
    />
  ))
}
  
   
   <div id="visor"  ref={externalRef}></div>
  
  </>
  
};

const Tolike = gql`
  mutation Like($id: String, $person: String) {
    likes(_id: $id, person: $person) {
      status
    }
  }
`;

const dislike = gql`
  mutation Dislike($id: String, $person: String) {
    removeLike(id: $id, person: $person) {
      status
    }
  }
`;

const Video = (props) => {
  // const [Isplay,playing] = useState(props.status)
  const [LikeTo, { data }] = useMutation(Tolike);
  const [dislikeTo] = useMutation(dislike);

  const [Melike, playLike] = useState(false);

//isloaing state
  const [isload, setLoading] = useState(true);

useEffect(() => { 

console.log(isload)

},[isload])

  let grayhear;

  const splace = (e) => {
    e.target.style.display = "none";
  };

  if (data) {
    grayhear = (
      <img
        src={hearfillG}
        className="like-hear-front"
        onAnimationEnd={splace}
      ></img>
    );
  }

  useEffect(() => {
    let exist = false;

    for (const person of props.likes) {
      if (person.idU == localStorage.getItem("ID_A")) {
        exist = true;
        playLike(true);
      }
    }

    if (!exist) {
      playLike(false);
    }
  }, []);

  const Ev = useRef(null);

  useEffect(() => {
    obersevador.observe(Ev.current);
  }, []);




  const like = () => {
    if (!Melike) {
      LikeTo({
        variables: { id: props.id, person: localStorage.getItem("ID_A") },
      });
      playLike(true);
    } else {
      dislikeTo({
        variables: { id: props.id, person: localStorage.getItem("ID_A") },
      });
      playLike(false);
    }
  };

  const plays = (e) => {
    if (e.target.paused) {
      e.target.play();
      // playing(false)
    } else {
      e.target.pause();
      // playing(true);
    }
  };

  const commas = (likes) => {
    return likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };



  return (
    <div className="container-video">
      <div className="atributos">
        <div className="atributo" onClick={like}>
          <img
            src={Melike == true ? hearfill : hear}
            alt="likes icon"
            className="hear" />
          <p style={{ color: "white" }}>{commas(props.likes.length)}</p>
        </div>

        <div
          className="atributo"
          onClick={() => {
            props.handleCommnets(props.id);
          } }
        >
          <img src={burble} className="hear" alt="comments icon" />
          <p style={{ color: "white" }}>
            {props.ComentsCan ? commas(props.ComentsCan.length) : 0}
          </p>
        </div>

        <div className="atributo">
          <img src={send} className="hear" alt="send icon" />
        </div>

        <div className="atributo">
          <img src={puntos} className="--20" alt="options icons" />
        </div>
      </div>

      {grayhear}
      {/* evento mientras descarga los recursos set loading true*/}


      <div  className="spinner-loadder" style={{display : isload ? "flex" : 'none'}} >

      <div  className="spinner"></div>

      </div>


      <video

         style={{filter : isload ? "blur(5px)" : "none"}}
        id="video"
        loop={true}
        poster={poster}
        className="video"
        onDoubleClick={like}
        src={props.src}
        onClick={plays}
        ref={Ev} 
         onContextMenu={ e => e.preventDefault()}
            onCanPlay={() =>  setLoading(false)}   
            onWaiting={() => setLoading(true)}
        />
    </div>   
  );
};

const Comentarios = (props) => {
  console.log(props._id);

  const query = gql`
    query GetComents($id: String) {
      getOneReal(_id: $id) {
        coments {
          ref
          text
          time
        }
      }
    }
  `;

  const sendComent = gql`
    mutation Comentar($id: String, $person: String, $text: String) {
      addComent(_id: $id, person: $person, text: $text) {
        status
      }
    }
  `;

  const { error, loading, data, refetch } = useQuery(query, {
    variables: { id: props._id },
  });
  const [comentar] = useMutation(sendComent);
  const [text, setText] = useState("");

  useEffect(() => {
    refetch();
  }, []);

  if (error) {
    return "data not fount";
  }

  if (loading) {
    return "loading";
  }

  const write = (e) => {
    setText(e.target.value);
  };

  const clickComent = (e) => {
    comentar({
      variables: {
        id: props._id,
        person: localStorage.getItem("ID_A"),
        text: text,
      },
    });

    setText("");
  };

  console.log(data);
  let coments;
  if (data.getOneReal.coments != null) {
    coments = data.getOneReal.coments.map((x,index) => (
      <Comentario key={x.ref + index } name={x.ref} timestamp={x.time} text={x.text} />
    ));
  }

  return (
    <div>
      <div className="topbar">
        <ul className="items_topbar">
          <li>
            <img
              src={flechita}
              alt="volver"
              style={{
                width: "30px",
                transform: "rotate(180deg)",
                marginRight: "30px",
              }}
              onClick={() => props.handleCommnets()}
            />
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Comentarios
            </span>
          </li>
          <li>
            <img src={send} alt="send" />
          </li>
        </ul>
      </div>

      <div className="DisplayComents">{coments}</div>

      <div className="BottomBarCommens">
        <img
          src={perfil}
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          alt="perfil img"
        />
        <input
          type="text"
          value={text}
          onChange={write}
          className="text_coment"
          placeholder="Agrega un comentario..."
        />
        <button
          style={{
            color: "#039be5",
            marginTop: "5px",
            fontSize: "14px",
            border: "none",
            backgroundColor: "transparent",
          }}
          onClick={clickComent}
        >
          Publicar
        </button>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const Comentario = (props) => {

const getUsername = gql`

query getName($id: String){




  GetUser(id:$id){

   name



  }


}






`






const {loading,data,err} = useQuery(getUsername,{variables:{id:props.name}})
let username;



if(loading){
username = '...'



}


if(data){

console.log(data);
username = data.GetUser.name

}







  const CalcularTime = (time) => {
    if (time < 60) {
      return `${time.toFixed(0)}s`;
    }

    if (time >= 60) {
      if (time >= 3600) {
        if (time / 3600 >= 24) {
          if ((time / 3600) * 24 >= 7) {
            return `${((time / 3600) * 24 * 7).toFixed(0)}sem`;
          }

          return `${((time / 3600) * 24).toFixed(0)}d`;
        }

        return `${(time / 3600).toFixed(0)}h`;
      }

      return `${(time / 60).toFixed(0)}m`;
    }
  };

  return (
    <div style={{ backgroundColor: "black", color: "white", padding: "10px",marginLeft:'10px' }}>
      <div style={{ display: "flex"}}>
        <img src={perfil2} style={{ width: "30px" }} alt="imagem perfil" />
        {/* <p style={{ marginRight: "10px",marginLeft:"10px" ,fontSize: "14px",fontWeight: "bold" }}>{username}</p> */}
        <p style={{fontSize: "14px",marginLeft:"10px",width: "280px"}}><span style={{ marginRight: "10px",fontWeight: "bold"}}>{username}</span>{   props.text}</p>
      </div>
      <div
        style={{
          width: "200px",
          display: "flex",
          justifyContent: "space-around",
          fontSize: "12px",
          color: "#777",
          marginLeft:'30px'
        }}
      >
        <p>{CalcularTime((new Date() - props.timestamp) / 1000)}</p>
        <p>{props.likes} Me gustas</p>
        <p>Responder</p>
      </div>
    </div>
  );
};


