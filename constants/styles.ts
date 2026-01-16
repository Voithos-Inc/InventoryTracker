import { StyleSheet, Dimensions, Platform } from 'react-native';

const COLORS_FROM_SITE = {
  MAXS_TEAL: '#0f575a',
  MINT: '#a2d3ca',
  VANILLA: '#f2eee6',
  WHITE: '#ffffff',
  SHERBET: '#e88743',
}

export const COLORS = {
  ...COLORS_FROM_SITE,
  pure_white: COLORS_FROM_SITE.WHITE,
  pure_black: '#000',
  transparent: 'transparent',
  header_bg: COLORS_FROM_SITE.MAXS_TEAL,
  main_bg: COLORS_FROM_SITE.VANILLA,
  cardBg: COLORS_FROM_SITE.VANILLA,
  textonbg: '#eeeeee',
  textoncontrast: '#111111',
  textgray: "#676767",
  tabBarBg: COLORS_FROM_SITE.MAXS_TEAL,
  tabBarActive: '#6097AD',
  deny: '#d40006',
  confirm: COLORS_FROM_SITE.MAXS_TEAL,
  tintedGreen: '#a5d5a7',
  green: '#28A745',
  warn: COLORS_FROM_SITE.SHERBET
};

export const FONTS = {
  heading: 'AlternateGothicNo3D-Regular', // For all headings
  bodyLight: 'FuturaCyrillicLight',
  body: 'FuturaPT-Book',                  // For regular body text
  bodyMedium: 'FuturaPT-Medium',          // For medium weight body text
  bodyBold: 'FuturaPT-Bold',              // For bold body text
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.main_bg,
    ...(Platform.OS === 'web' && { overscrollBehavior: 'none' as any }),
  },
  headerContainer: {
    backgroundColor: COLORS.header_bg,
  },
  header: {
    backgroundColor: COLORS.header_bg,
    position: "absolute",
    left: 0,
    top: 0,
    height: 100,
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 12,
    alignItems: 'center',
    zIndex: 67,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    fontSize: 56,
    fontFamily: FONTS.heading,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, .8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
    textAlign: "center"
  },
  headerLogo: {
    width: '20%',
    zIndex: 670
  },
  bodyContainer: {
    marginTop: 100,
    ...(Platform.OS === 'web' && { overscrollBehavior: 'none' as any }),
  },
  sectionHeader: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionHeaderWrapper: {
    position: 'relative',
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: COLORS.main_bg,
  },
  sectionHeaderGradient: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    height: 40,
  },
  sectionTitle: {
    fontSize: 42,
    fontFamily: FONTS.heading,
    color: COLORS.MAXS_TEAL,
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
  gridScrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.main_bg
  },
  grid: {
    width: '100%',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 30,
  },
  gridItem: {
    marginBottom: 32,
    marginHorizontal: 20,
  },
  draggableGridItem: {
    width: `${100.0 / 3.0}%`,
  },
  card: {
    aspectRatio: 2.2,
    backgroundColor: COLORS.cardBg,
    borderColor: COLORS.MINT,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    marginTop: 10
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
    padding: 20,
    alignItems: 'center',
    minWidth: .8 * screenWidth,
    maxHeight: .9 * screenHeight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    flex: 1,
    justifyContent: "space-around",
  },
  modalInnerContent: {
    flex: 1,
    flexDirection: "row",
    gap: 60,
    width: '100%',
    justifyContent: "space-evenly",
    marginTop: 20
  },
  modalTitle: {
    fontSize: 40,
    fontFamily: FONTS.heading,
    color: COLORS.textoncontrast,
    marginTop: 12,
    marginBottom: 4,
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
  rowAlternatingText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  // Settings Page Styles
  settingsSpacer: {
    height: 0,
    width: 0,
    marginVertical: 10,
  },
  settingsTwoColumnContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 40,
    gap: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  settingsColumn: {
    flex: 1,
    maxWidth: 500,
  },
  settingsSectionTitle: {
    width: '100%',
    fontSize: 42,
    fontFamily: FONTS.heading,
    marginBottom: 16,
    color: COLORS.MAXS_TEAL,
    textAlign: 'center',
  },
  settingsButtonGroup: {
    gap: 20,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 3,
    padding: 20,
    gap: 20,
    width: '100%',
    minHeight: 120,
  },
  settingsButtonPrimary: {
    backgroundColor: COLORS.confirm,
    borderColor: COLORS.confirm,
  },
  settingsButtonSecondary: {
    borderColor: COLORS.header_bg,
    backgroundColor: 'transparent',
  },
  settingsButtonWarning: {
    borderColor: '#FFA500',
    backgroundColor: 'transparent',
  },
  settingsButtonSuccess: {
    borderColor: '#28A745',
    backgroundColor: 'transparent',
  },
  settingsButtonProgress: {
    borderColor: '#2196F3',
    backgroundColor: 'transparent',
    minHeight: 160,
    width: '60%',
    maxWidth: 700,
  },
  settingsButtonText: {
    fontSize: 32,
    fontFamily: FONTS.bodyMedium,
    textAlign: 'center',
    color: COLORS.textoncontrast,
    width: 'auto',
  },
  settingsButtonTextPrimary: {
    fontSize: 32,
    fontFamily: FONTS.bodyMedium,
    textAlign: 'center',
    color: 'white',
    width: 'auto',
  },
  settingsButtonTextProgress: {
    fontSize: 38,
    fontFamily: FONTS.bodyMedium,
    textAlign: 'center',
    color: COLORS.textoncontrast,
    width: 'auto',
  },
  settingsProgressContainer: {
    paddingHorizontal: 40,
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  imagePickerContainer: {
    alignItems: 'center'
  },
  imagePickerButton: {
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  imagePickerButtonText: {
    fontSize: 16,
    fontFamily: FONTS.body
  },
  imagePickerImage: {
    width: 200,
    height: 200,
    borderRadius: 8
  },
  itemFormTextInput: {
    borderRadius: 20,
    fontWeight: '600',
    textAlign: 'center',
    minWidth: 80,
    width: 'auto',
  },
  gridShelfHeaderContainer: {
    width: '100%',
    height: 42,
    borderBottomColor: COLORS.textgray,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginBottom: 20,
  },
  gridShelfHeader: {
    color: COLORS.textgray,
    fontSize: 20,
    fontWeight: '500',
  }
});
