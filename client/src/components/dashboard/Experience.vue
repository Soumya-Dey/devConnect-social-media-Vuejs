<template>
    <div>
        <h2 class="my-2">Experience Credentials</h2>
        <table class="table bg-white">
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th class="hide-sm">Years</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="exp in experiences" :key="exp._id">
                    <td>{{ exp.company }}</td>
                    <td>{{ exp.title }}</td>
                    <td class="hide-sm">
                        {{ exp.from | moment("YYYY/MM/DD") }} -
                        {{
                            exp.to === null
                                ? "Now"
                                : exp.to | moment("YYYY/MM/DD")
                        }}
                    </td>
                    <td>
                        <button
                            class="btn btn-danger btn-round"
                            @click="onClick(exp._id)"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Experience",
    methods: {
        ...mapActions(["deleteExperience", "getCurrentProfile"]),
        onClick(expId) {
            this.deleteExperience({ expId });
            this.getCurrentProfile();
            window.scrollTo(0, 0);
        },
    },
    props: ["experiences"],
};
</script>

<style></style>
