import { StyleSheet } from 'react-native';

export const COLORS = {
  header_bg: '#6097AD',
  main_bg: '#A1D7E9',
  cardBg: '#f2eee6',
  textonbg: '#eee',
  textoncontrast: '#111',
  tabBarBg: '#0c575b',
  tabBarActive: '#6097AD',
};

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.main_bg,
    height: 100
  },
  header: {
    backgroundColor: COLORS.header_bg,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#5A8CA0',
  },
  headerTitle: {
    fontSize: 48,
    fontWeight: '750',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, .8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  sectionHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '650',
    color: COLORS.textonbg,
    textShadowColor: 'rgba(0, 0, 0, .75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '28%',
    aspectRatio: 2.2,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 16,
    color: COLORS.textoncontrast,
    flex: 1,
  },
});