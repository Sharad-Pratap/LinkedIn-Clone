
import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { postArticleAPI } from "../actions";
import { serverTimestamp } from 'firebase/firestore';


const PostModal = (props) => {
    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setvideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === "" || image === undefined) {
            alert(`not a image, the file is a ${typeof image}`)
            return;
        }

        setShareImage(image);
    }


    const switchAssetArea = (area) => {
        setShareImage("")
        setvideoLink("")
        setAssetArea(area);

    }

    const postArticle = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: serverTimestamp(),
        };
        props.postArticle(payload);
        reset(e);
    };

    const reset = (e) => {
        setEditorText("");
        setShareImage("")
        setvideoLink("")
        setAssetArea("");
        props.handleClick(e);
    };

    return (
        <>
            {props.showModal === "open" &&
                <Container>
                    <Content>
                        <Header>
                            <h2>
                                Create a post
                            </h2>
                            <button onClick={(event) => reset(event)}>
                                <img src="/images/close-icon.png" alt="" />
                            </button>
                        </Header>
                        <SharedContent>
                            <UserInfo>
                                {props.user.photoURL ? (<img src={props.user.photoURL} alt="" />)
                                    :
                                    (<img src="/images/user.svg" alt="" />)
                                }
                                <span>{props.user.displayName}</span>
                            </UserInfo>
                            <Editor>
                                <textarea value={editorText}
                                    onChange={(e) => setEditorText(e.target.value)}
                                    placeholder="what do you want to talk about?"
                                    autoFocus={true} />
                                {assetArea === "image" ? (


                                    <UploadImage>


                                        <input type="file"
                                            accept="image/gif , image/jpeg , image/jpg, image/png"
                                            name="image"
                                            id="file "
                                            // style={{ display: "none" }}
                                            onChange={handleChange}
                                        />
                                        {/* <p>
                                            <label htmlFor="file"> Select an image to share</label>
                                        </p> */}

                                        {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
                                    </UploadImage>
                                ) : (assetArea === "media" && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Please enter a video link"
                                            value={videoLink}
                                            onChange={(e) => setvideoLink(e.target.value)}
                                        />
                                        {videoLink && <ReactPlayer width={'100%'} url={videoLink} />}

                                    </>
                                ))}

                            </Editor>
                        </SharedContent>
                        <SharedCreation>
                            <AttachAssets>
                                <AssetButton onClick={() => switchAssetArea("image")}>
                                    <img src="/images/share-image.png" alt="" />
                                </AssetButton>
                                <AssetButton onClick={() => switchAssetArea("media")} >
                                    <img src="/images/share-video.png" alt="" />
                                </AssetButton>
                            </AttachAssets>
                            <ShareComments>
                                <AssetButton>
                                    <img src="/images/share-comment.png" alt="" />
                                    Anyone
                                </AssetButton>
                            </ShareComments>
                            <PostButton disabled={!editorText ? true : false}
                                onClick={(event) => postArticle(event)}
                            >
                                Post
                            </PostButton>
                        </SharedCreation>
                    </Content>
                </Container>
            }
        </>
    )

}
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(0,0,0,0.8);
    animation: fadeIn 0.3s;
    `;

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow:initial;
    border-radius:5px ;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: block;
    padding:16px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
        height: 40px;
        width: 40px;
        min-width:auto;
        color: rgba(0,0,0,0.15);
        png ,img{
            pointer-events: none;
        }
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;

`;
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg , img{
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius:50%;
    }
    span{
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left:5px;

    }
`;

const SharedCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 14px;
`;


const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0,0,0,0.5);
    
`;
const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    ${AssetButton}{
        width: 40px;
    }
`;
const ShareComments = styled.div`
    padding-left:8px;
    margin-right: auto;
    border-left: 1px solid rgba(0,0,0,0.15);
    ${AssetButton}{
        png{
            margin-right: 5px;
        }
    }
`;

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 60px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
    color : ${(props) => (props.disabled ? "rgba(0,0,0,0.2)" : "white")};
    &:hover{
        background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
    }
`;

const Editor = styled.div` 
    padding:12px 24px;
    textarea{
        width:100%;
        min-height: 100px;
        resize: none;
}
input{
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
}
`;

const UploadImage = styled.div`
    text-align: center;
     img{
        width: 100%;
     }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
};
const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);