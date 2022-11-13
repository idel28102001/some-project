import type { ActionTree, GetterTree, MutationTree } from "vuex";
import { createLogger, createStore } from "vuex";
import type {
  Actions,
  CustomStore,
  Getters,
  Mutations,
  State,
} from "@/types/store.type";

const state: State = {
  cartProducts: [],
};

const mutations: MutationTree<State> & Mutations = {};

export const actions: ActionTree<State, State> & Actions = {};

export const getters: GetterTree<State, State> & Getters = {};

export const store = createStore({
  state,
  mutations,
  getters,
  actions,
  plugins: [createLogger()],
}) as CustomStore;

export const useStore = () => {
  return store;
};
