import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'react-native-linear-gradient';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {
  apiGetDetailSport,
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from '../api/moviedb';
import Cast from '../components/cast';
import Loading from '../components/loading';
import MovieList from '../components/movieList';
import { styles, theme } from '../theme';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';
var {width, height} = Dimensions.get('window');

export const itemMovieDefault = [{
  _id: "652b6269f6edbfb6095cf6f9",
  title : "Big Buck Bunny",
  video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  type:"video",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ziBi9c8-xrt1VAW2Ie56LFtexAtTpjS_dQ&usqp=CAU",
  overview:"Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
  release_date:"2001-06-09",
  status:"Released",
  runtime:"500"
}]

export default function MovieScreen() {
  const {params: item} = useRoute();
  const ref = useRef();
  const navigation = useNavigation();
  const [progress, setProgress] = useState(null);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [puased, setPaused] = useState(false);
  const [similarMovies, setSimilarMovies] = useState();
  const [movieSport, setMovieSport] = useState([]);

  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    if (item?.video) {
      setLoading(true);
      getMovieSport(item._id);
    } else {
      setLoading(true);
      getMovieDetials(item.id);

      getSimilarMovies(item.id);
    }
    getMovieDetials(item.id || 1047041);
    getMovieCredits(item.id || 1047041);
    getSimilarMovies(item.id || 1047041);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  const getMovieDetials = async id => {
    const data = await fetchMovieDetails(id);
    setLoading(false);
    if (data) {
      setMovie({...movie, ...data});
    }
  };
  const getMovieCredits = async id => {
    const data = await fetchMovieCredits(id);
    console.log('got movie credits');
    if (data && data.cast) {
      setCast(data.cast);
    }
  };
  const getSimilarMovies = async id => {
    const data = await fetchSimilarMovies(id);
    console.log('got similar movies');
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };

  const getMovieSport = async id => {
    const data = await apiGetDetailSport(id);
    if (data && data.data) {
      setLoading(false);
      setMovieSport(data.data);
    }
  };


  return (
    <>
      {item?.video ? (
        <ScrollView contentContainerStyle={{paddingBottom: 100}} style={{backgroundColor: '#262626'}}>
          <View style={{backgroundColor: '#262626', flexGrow: 1}}>
            <TouchableOpacity
              style={{width: '100%', height: fullScreen ? '100%' : 300}}
              onPress={() => {
                setClicked(true);
              }}>
              <Video
                paused={puased}
                source={{
                  uri: item?.video,
                }}
                ref={ref}
                onProgress={x => {
                  setProgress(x);
                }}
                style={{width: '100%', height: fullScreen ? '100%' : 300}}
                resizeMode="contain"
              />
              {clicked && (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundColor: 'rgba(0,0,0,.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        ref.current.seek(parseInt(progress.currentTime) - 10);
                      }}>
                      <Image
                        source={require('../backward.png')}
                        style={{width: 30, height: 30, tintColor: 'white'}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setPaused(!puased);
                      }}>
                      <Image
                        source={
                          puased
                            ? require('../play-button.png')
                            : require('../pause.png')
                        }
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: 'white',
                          marginLeft: 50,
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        ref.current.seek(parseInt(progress.currentTime) + 10);
                      }}>
                      <Image
                        source={require('../forward.png')}
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: 'white',
                          marginLeft: 50,
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      position: 'absolute',
                      top: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (fullScreen) {
                          Orientation.lockToPortrait();
                        } else {
                          Orientation.lockToLandscape();
                        }
                        setFullScreen(!fullScreen);
                      }}>
                      <Image
                        source={
                          fullScreen
                            ? require('../minimize.png')
                            : require('../full-size.png')
                        }
                        style={{width: 24, height: 24, tintColor: 'white'}}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: '#262626', paddingTop:5, borderTopWidth:3 , borderTopColor:"#fff"}}>
            {/* title */}
            <Text className="text-white text-center text-3xl font-bold tracking-widest">
              {movieSport?.title}
            </Text>
            {/* status, release year, runtime */}
            {movieSport?._id ? ( 
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {movieSport?.status || 'N/A'} •{' '}
                {movieSport?.release_date || 'N/A'}• {movieSport?.runtime} min
              </Text>
            ) : null}

            {/* genres  */}
            <View className="flex-row justify-center mx-4 space-x-2">
              {movie?.genres?.map((genre, index) => {
                let showDot = index + 1 != movie.genres.length;
                return (
                  <Text
                    key={index}
                    className="text-neutral-400 font-semibold text-base text-center">
                    {genre?.name} {showDot ? '•' : null}
                  </Text>
                );
              })}
            </View>

            {/* description */}
            <Text className="text-neutral-400 mx-4 tracking-wide">
              {movieSport?.overview}
            </Text>

            {/* cast */}
            {movie?.id && cast.length > 0 && (
              <Cast navigation={navigation} cast={cast} />
            )}

            {/* similar movies section */}
            {movie?.id && similarMovies?.length > 0 && (
              <MovieList
                title={'Similar Movies'}
                hideSeeAll={true}
                data={similarMovies}
              />
            )}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={{paddingBottom: 50}}
          className="flex-1 bg-neutral-900">
          {/* back button and movie poster */}
          <View className="w-full">
            <SafeAreaView
              className={
                'absolute z-20 w-full flex-row justify-between items-center px-4 ' +
                topMargin
              }>
              <TouchableOpacity
                style={styles.background}
                className="rounded-xl p-1"
                onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                <HeartIcon
                  size="35"
                  color={isFavourite ? theme.background : 'white'}
                />
              </TouchableOpacity>
            </SafeAreaView>
            {loading ? (
              <Loading />
            ) : (
              <View>
                <Image
                  // source={require('../assets/images/moviePoster2.png')}
                  source={{
                    uri: image500(movie.poster_path) || fallbackMoviePoster,
                  }}
                  style={{width, height: height * 0.55}}
                />
                <LinearGradient
                  colors={[
                    'transparent',
                    'rgba(23, 23, 23, 0.8)',
                    'rgba(23, 23, 23, 1)',
                  ]}
                  style={{width, height: height * 0.4}}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  className="absolute bottom-0"
                />
              </View>
            )}
          </View>

          {/* movie details */}

          <View style={{marginTop: -(height * 0.09)}} className="space-y-3">
            {/* title */}
            <Text className="text-white text-center text-3xl font-bold tracking-widest">
              {movie?.title}
            </Text>

            {/* status, release year, runtime */}
            {movie?.id ? (
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'}{' '}
                • {movie?.runtime} min
              </Text>
            ) : null}

            {/* genres  */}
            <View className="flex-row justify-center mx-4 space-x-2">
              {movie?.genres?.map((genre, index) => {
                let showDot = index + 1 != movie.genres.length;
                return (
                  <Text
                    key={index}
                    className="text-neutral-400 font-semibold text-base text-center">
                    {genre?.name} {showDot ? '•' : null}
                  </Text>
                );
              })}
            </View>

            {/* description */}
            <Text className="text-neutral-400 mx-4 tracking-wide">
              {movie?.overview}
            </Text>
          </View>

          {/* cast */}
          {movie?.id && cast.length > 0 && (
            <Cast navigation={navigation} cast={cast} />
          )}

          {/* similar movies section */}
          {movie?.id && similarMovies?.length > 0 && (
            <MovieList
              title={'Similar Movies'}
              hideSeeAll={true}
              data={similarMovies}
            />
          )}
        </ScrollView>
      )}
    </>
  );
}
