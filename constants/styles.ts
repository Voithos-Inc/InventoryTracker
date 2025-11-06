import { StyleSheet, Dimensions } from 'react-native';

export const COLORS = {
  header_bg: '#6097AD',
  main_bg: '#A1D7E9',
  cardBg: '#f2eee6',
  textonbg: '#eeeeee',
  textoncontrast: '#111111',
  textgray: "#676767",
  tabBarBg: '#0c575b',
  tabBarActive: '#6097AD',
  deny: '#d40006',
  confirm: '#0c575b'
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height

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
    fontWeight: '700',
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
    fontWeight: '700',
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 100,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.main_bg
  },
  grid: {
    width: screenWidth * 0.9,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 32,
    marginBottom: 30
  },
  card: {
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
  },
  cardIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '600',
    paddingLeft: 24,
    color: COLORS.textoncontrast,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    minWidth: .4 * screenWidth,
    maxWidth: .5 * screenHeight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.textoncontrast,
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalSubtext: {
    fontSize: 32,
    fontWeight: '550',
    color: COLORS.textgray,
    marginBottom: 14,
  },
  modalButtonsContainer: {
    marginTop: 20,
    marginBottom: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%"
  },
  modalButton: {
    backgroundColor: COLORS.header_bg,
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 10,
    minWidth: 150,
  },
  modalButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textonbg,
    textAlign: 'center',
  },
  settingsContainer: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
  },
  settingsButton: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 3,
    borderStyle: "solid",
    height: 75,
    width: 343,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  settingsButtonText: {
    fontSize: 24,
    fontWeight: '400',
    textShadowColor: 'rgba(255, 255, 255, .6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    marginLeft: 20
  }
});