import React, { useContext, useEffect, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View,Image } from 'react-native';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieList from '../components/movieList';
import TrendingMovies from '../components/trendingMovies';
import { useNavigation } from '@react-navigation/native';
import {
  apiGetMovieSport,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';
import Loading from '../components/loading';
import { MyContext } from '../context/MyContext';
import { styles } from '../theme';
import { itemMovieDefault } from './MovieScreen';

const ios = Platform.OS === 'ios';

export default function HomeScreenMovies() {
  const {setToken} = useContext(MyContext);
  const [seeAllTopRate, setSeeAllTopRate]= useState(false);
  const [seeAllUpcoming, setSeeAllUpcoming]= useState(false);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [movieSport, setMovieSport] = useState([...itemMovieDefault]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getListSportMovie();
  }, []);

  const handleSeeTopRate = async()=>{
    if(seeAllTopRate){
      const data = await fetchTopRatedMovies();
      if (data && data.results) setTopRated(data.results.slice(0, 4));
    }else{
      const data = await fetchTopRatedMovies();
      if (data && data.results) setTopRated(data.results);
    }
    setSeeAllTopRate(!seeAllTopRate)
  }

  const handleSeeUpComing = async()=>{
    if(seeAllUpcoming){
      const data = await fetchUpcomingMovies();
      if (data && data.results) setUpcoming(data.results.slice(0, 4));
    }else{
      const data = await fetchUpcomingMovies();
      if (data && data.results) setUpcoming(data.results);
    }
    setSeeAllUpcoming(!seeAllUpcoming)
  }

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcoming(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
  };

  const getListSportMovie = async () => {
    const data = await apiGetMovieSport();
    if (data && data?.data) setMovieSport([...itemMovieDefault,...data?.data]);
  };

  const handleLogOut = () => {
    setToken(null);
  };

  return (
    <View className="flex-1 bg-neutral-800 pt-5">
      {/* search bar */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        {/* <StatusBar style="light" /> */}
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity onPress={handleLogOut}>
            <Image source={require('../ic_logout.png')} style={{width:25, height:25 ,  tintColor :"#fff"}}/>
            {/* <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" /> */}
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 80}}>
          {/* Trending Movies Carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* upcoming movies row */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming}  hideSeeAll={seeAllUpcoming} handleSeeTopRate={handleSeeUpComing}/>
          )}
          {/* top rated movies row */}
          {topRated?.length > 0 && (
            <MovieList title="Top Rated" data={topRated}  hideSeeAll={seeAllTopRate} handleSeeTopRate={handleSeeTopRate}/>
          )}
            {/* movies sport  row */}
          {movieSport?.length > 0 && (
            <MovieList title="Hot 2023" data={movieSport} />
          )}
        </ScrollView>
      )}
    </View>
  );
}
