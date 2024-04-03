import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getPage() {
    return await AsyncStorage.getItem("lastPage")
}

export async function setPage(page) {
    return await AsyncStorage.setItem("lastPage", page)
}