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
  confirm: '#0c575b',
  tintedGreen: '#a5d5a7',
  green: '#28A745',
};

// Font families - MUST match the keys in useFonts()
export const FONTS = {
  heading: 'AlternateGothicNo3D-Regular', // For all headings
  body: 'FuturaPT-Book',                  // For regular body text
  bodyMedium: 'FuturaPT-Medium',          // For medium weight body text
  bodyBold: 'FuturaPT-Bold',              // For bold body text
};

const screenWidth = Dimensions.get('window').width;

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
    fontFamily: FONTS.heading,
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
    fontFamily: FONTS.heading,
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  gridItem: {
    width: (screenWidth * 0.9 - 2 * 32) / 3,
    marginBottom: 32,
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
    fontFamily: FONTS.heading,
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
    minWidth: .75 * screenWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    flex: 1
  },
  modalTitle: {
    fontSize: 32,
    fontFamily: FONTS.heading,
    color: COLORS.textoncontrast,
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalSubtext: {
    fontSize: 32,
    fontFamily: FONTS.heading,
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
    fontFamily: FONTS.bodyBold,
    color: COLORS.textonbg,
    textAlign: 'center',
  },
  settingsContainer: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 12,
  },
  settingsSectionTitle: {
    width: '80%',
    fontSize: 20,
    fontFamily: FONTS.heading,
    marginBottom: 16,
    color: COLORS.textoncontrast,
    alignSelf: "center",
    marginLeft: -4
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 12,
    borderWidth: 3,
    padding: 20,
    gap: 20,
    width: '100%',
  },
  settingsButtonText: {
    width: '80%',
    fontSize: 18,
    fontFamily: FONTS.bodyMedium,
    textAlign: 'center',
    color: COLORS.textoncontrast
  },
  imagePickerContainer: { alignItems: 'center' },
  imagePickerButton: {
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  imagePickerButtonText: {
    fontSize: 16,
    fontFamily: FONTS.body,
  },
  imagePickerImage: { width: 200, height: 200, borderRadius: 8 },
});