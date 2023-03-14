import { useEffect, FC, memo, useContext } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

interface WistiaPlayerEmbedProps {
  productId: string;
  selectedVideoId?: string | null;
}

export type WistiaThumbnail = {
  url: string;
  videoId: string;
};

const useStyles = makeStyles(() => {
  return {
    videoContainer: {
      height: '45%',
      display: 'none',
      '@supports (aspect-ratio: 16 / 9)': {
        height: 'auto',
        aspectRatio: '16 / 9',
      },
    },
    video: {
      height: '100%',
    },
    videoShow: {
      display: 'block',
    },
  };
});

const WistiaPlayerEmbed: FC<WistiaPlayerEmbedProps> = (props) => {
  const { productId, selectedVideoId = null } = props;

  const { selectedWistiaVideoId } = useContext(ProductContext);

  const classes = useStyles();
  const wistiaVideoIds: string[] = useSelector(
    (state) => getProductWistiaVideoIds(productId, state) || [],
  );

  // use the provided selectedId or the one from context
  const selectedId = selectedVideoId || selectedWistiaVideoId;

  useEffect(() => {
    // need to load E-v1.js & embed videos
    const eV1Script = document.createElement('script');

    eV1Script.src = 'https://fast.wistia.com/assets/external/E-v1.js';
    eV1Script.async = true;

    document.body.appendChild(eV1Script);

    wistiaVideoIds.forEach((videoId) => {
      const embedVideoScript = document.createElement('script');

      embedVideoScript.src = `https://fast.wistia.com/embed/medias/${videoId}.jsonp`;
      embedVideoScript.async = true;

      document.body.appendChild(embedVideoScript);
    });
  }, []);

  useEffect(() => {
    // need to load E-v1.js & embed videos
    const eV1Script = document.createElement('script');

    eV1Script.src = 'https://fast.wistia.com/assets/external/E-v1.js';
    eV1Script.async = true;

    document.body.appendChild(eV1Script);

    wistiaVideoIds.forEach((videoId) => {
      const embedVideoScript = document.createElement('script');

      embedVideoScript.src = `https://fast.wistia.com/embed/medias/${videoId}.jsonp`;
      embedVideoScript.async = true;

      document.body.appendChild(embedVideoScript);
    });
  }, []);

  return (
    <>
      {wistiaVideoIds.map((videoId) => {
        return (
                      <div
                        key={videoId}
                        className={classnames(classes.videoContainer, {
                          [classes.videoShow]: selectedId === videoId,
                        })}
                      >
                        <div
                          className={classnames(
                            `wistia_embed wistia_async_${videoId}`,
                            classes.video,
                          )}
                        ></div>
                      </div>
        );
      })}
    </>
  );
};

export default memo(WistiaPlayerEmbed);
