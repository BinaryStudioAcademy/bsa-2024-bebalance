import { type BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import React from "react";

import {
	Button,
	LoaderWrapper,
	ScreenWrapper,
	Text,
	View,
	Wheel as WheelChart,
} from "~/libs/components/components";
import { BottomTabScreenName, DataStatus } from "~/libs/enums/enums";
import {
	getFormattedDate,
	transformScoresToWheelData,
} from "~/libs/helpers/helpers";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useNavigation,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type BottomTabNavigationParameterList,
	type WheelDataItem,
} from "~/libs/types/types";
import { actions as quizActions } from "~/slices/quiz/quiz";

import { styles } from "./styles";

const WHEEL_SIZE = 250;

const Wheel: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigation =
		useNavigation<BottomTabNavigationProp<BottomTabNavigationParameterList>>();
	const [wheelData, setWheelData] = useState<WheelDataItem[]>([]);

	const { dataStatus, scores, scoresLastUpdatedAt } = useAppSelector(
		(state) => state.quiz,
	);

	const lastWheelUpdating = scoresLastUpdatedAt
		? getFormattedDate(new Date(scoresLastUpdatedAt), "d MMM yyyy, EEEE")
		: null;

	const handleEditPress = useCallback((): void => {
		navigation.navigate(BottomTabScreenName.EDIT_WHEEL_RESULTS);
	}, [navigation]);

	useEffect(() => {
		void dispatch(quizActions.getScores());
	}, [dispatch]);

	useEffect(() => {
		setWheelData(transformScoresToWheelData(scores));
	}, [scores]);

	return (
		<ScreenWrapper style={styles.screenWrapper}>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
				<View style={globalStyles.m16}>
					<Text preset="subheading" weight="bold">
						My Wheel Results
					</Text>
					<Text
						preset="tag"
						style={[globalStyles.pv4, globalStyles.ph12, styles.date]}
					>
						{lastWheelUpdating}
					</Text>
					<View style={styles.container}>
						<View style={globalStyles.alignItemsCenter}>
							<WheelChart categoriesData={wheelData} size={WHEEL_SIZE} />
						</View>
						<View style={globalStyles.mh48}>
							<Button label="EDIT MY WHEEL RESULTS" onPress={handleEditPress} />
						</View>
					</View>
				</View>
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { Wheel };
