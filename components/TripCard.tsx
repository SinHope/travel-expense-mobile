import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TripCardProps {
  destination: string;
  date: string;
  budget: number;
}

const TripCard: React.FC<TripCardProps> = ({ destination, date, budget }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.destination}>📍 {destination}</Text>
      <Text style={styles.date}>📅 {date}</Text>
      <Text style={styles.budget}>💰 ${budget}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  destination: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  budget: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: '600',
  },
});

export default TripCard;
