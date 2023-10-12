import React, {useContext, useEffect, useState} from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import MovieList from '../components/movieList';
import TrendingMovies from '../components/trendingMovies';
// import {StatusBar} from 'expo-status-bar';
import YoutubePlayer from 'react-native-youtube-iframe';

import {useNavigation} from '@react-navigation/native';
import {
  apiGetMovieSport,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';
import Loading from '../components/loading';
import {MyContext} from '../context/MyContext';
import {styles} from '../theme';

const ios = Platform.OS === 'ios';

export default function HomeScreenMovies() {
  const {setToken} = useContext(MyContext);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [movieSport, setMovieSport] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getListSportMovie();
  }, []);

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
    if (data && data.results) setMovieSport(data.results);
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
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
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
          contentContainerStyle={{paddingBottom: 10}}>
          {/* Trending Movies Carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* upcoming movies row */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}
          <YoutubePlayer
            height={300}
            play={true}
            videoId={'iee2TATGMyI'}
            // onChangeState={onStateChange}
          />
          {/* top rated movies row */}
          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
}
